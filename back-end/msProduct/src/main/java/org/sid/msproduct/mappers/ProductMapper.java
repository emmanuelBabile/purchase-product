package org.sid.msproduct.mappers;

import org.sid.msproduct.dto.ProductReq;
import org.sid.msproduct.dto.ProductResponse;
import org.sid.msproduct.entities.Product;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
@Service
public class ProductMapper {
    public ProductResponse fromProduct(Product product){
        ProductResponse productResponse = new ProductResponse();
        BeanUtils.copyProperties(product,productResponse);
        return productResponse;
    }
    //--------------------------------------
    public Product fromProductReq(ProductReq productReq){
        Product product = new Product();
        BeanUtils.copyProperties(productReq,product);
        return product;
    }
}
