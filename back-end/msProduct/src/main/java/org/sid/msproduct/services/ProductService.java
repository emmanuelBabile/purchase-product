package org.sid.msproduct.services;

import org.sid.msproduct.dto.ProductReq;
import org.sid.msproduct.dto.ProductResponse;

import java.util.List;

public interface ProductService {
    public ProductResponse add(ProductReq productReq);
    public ProductResponse getProduct(Long id);
    public ProductResponse updateProduct(Long id, ProductReq productReq);
    public void deleteProduct(Long id);
    List<ProductResponse> getAllProducts();
}
