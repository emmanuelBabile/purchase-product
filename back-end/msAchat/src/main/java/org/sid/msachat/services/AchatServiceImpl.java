package org.sid.msachat.services;

import org.sid.msachat.dto.AchatReq;
import org.sid.msachat.dto.AchatResponse;
import org.sid.msachat.dto.Currency;
import org.sid.msachat.dto.ProductResponse;
import org.sid.msachat.entities.Achat;
import org.sid.msachat.mappers.AchatMapper;
import org.sid.msachat.repositories.AchatRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class AchatServiceImpl implements AchatService {
    @Autowired
    AchatRepo achatRepo;
    @Autowired
    WebClient webClient;
    @Autowired
    AchatMapper achatMapper;

    @Override
    public AchatResponse add(AchatReq achatReq) {
        Achat achat = achatMapper.fromAchatReq(achatReq);
        //-----------------taux de change------
        Currency currency = webClient.get()
                .uri("https://v6.exchangerate-api.com/v6/0b04c355e2de4ee56a4a46a4/pair/EUR/"+achat.getCurrency())
                .retrieve()
                .bodyToMono(Currency.class)
                .block();

        //----------------------------------------
        double tot = 0;
        //----------------------------------------

        for(Long p:achat.getProducts()){
            ProductResponse productResponse = webClient.get()
                    .uri("http://localhost:8080/api/product/"+p)
                    .retrieve()
                    .bodyToMono(ProductResponse.class)
                    .block();
            tot += productResponse.getPrice();
        }
        achat.setTotal(tot*currency.getConversion_rate());
        achatRepo.save(achat);

        return achatMapper.fromAchat(achat);
    }

}