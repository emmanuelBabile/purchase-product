package org.sid.msachat.mappers;

import org.sid.msachat.dto.AchatReq;
import org.sid.msachat.dto.AchatResponse;
import org.sid.msachat.entities.Achat;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class AchatMapper {
    public AchatResponse fromAchat(Achat achat){
        AchatResponse achatResponse = new AchatResponse();
        BeanUtils.copyProperties(achat,achatResponse);
        return achatResponse;
    }
    ///-------------------------------
    public Achat fromAchatReq(AchatReq achatReq){
        Achat achat = new Achat();
        BeanUtils.copyProperties(achatReq,achat);
        return achat;
    }
}
