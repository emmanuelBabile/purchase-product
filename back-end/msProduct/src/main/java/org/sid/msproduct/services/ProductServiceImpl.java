package org.sid.msproduct.services;

import org.sid.msproduct.dto.ProductReq;
import org.sid.msproduct.dto.ProductResponse;
import org.sid.msproduct.entities.Product;
import org.sid.msproduct.mappers.ProductMapper;
import org.sid.msproduct.repositories.ProductRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    ProductRepo productRepo;
    @Autowired
    ProductMapper productMapper;
    @Override
    public ProductResponse add(ProductReq productReq) {
        Product product = productMapper.fromProductReq(productReq);
        productRepo.save(product);
        return productMapper.fromProduct(product);
    }
    //---------------------------------------
    @Override
    public ProductResponse getProduct(Long id) {
        Optional<Product> optionalProduct = productRepo.findById(id);
        if(optionalProduct.isPresent()){
            return productMapper.fromProduct(optionalProduct.get());
        }else{
            throw new EntityNotFoundException("Product with id=" + id + " not found");
        }
    }
    //---------------------------------------
    @Override
    public ProductResponse updateProduct(Long id, ProductReq productReq) {
        Optional<Product> optionalProduct = productRepo.findById(id);

        if(optionalProduct.isPresent()){
            Product existProd = optionalProduct.get();
            existProd.setName(productReq.getName());
            existProd.setCategory(productReq.getCategory());
            existProd.setPrice(productReq.getPrice());

            productRepo.save(existProd);

            return productMapper.fromProduct(existProd);

        }else{
            throw new EntityNotFoundException("Product with id=" + id + " not found");
        }
    }
    //---------------------------------------
    @Override
    public void deleteProduct(Long id) {
        boolean existProd=productRepo.existsById(id);

        if(!existProd){
            throw new EntityNotFoundException("ERROR, product with id: "+ id + "not found");
        }
        else{
            productRepo.deleteById(id);
        }
    }
    //---------------------------------------
    @Override
    public List<ProductResponse> getAllProducts() {
        List<ProductResponse> productResponses = new ArrayList<>();
        List<Product> products = productRepo.findAll();

        for (Product p : products) {
            ProductResponse productResponse = productMapper.fromProduct(p);
            productResponses.add(productResponse);
        }

        return productResponses;
    }

}