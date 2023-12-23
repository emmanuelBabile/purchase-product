package org.sid.msproduct.web;

import org.sid.msproduct.dto.ProductReq;
import org.sid.msproduct.dto.ProductResponse;
import org.sid.msproduct.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    ProductService productService;

    @PostMapping("/add")
    public ProductResponse addprod(@RequestBody ProductReq productReq){
        return productService.add(productReq);
    }
    //----------------------------
    @GetMapping("/{id}")
    public ProductResponse getprod(@PathVariable("id") Long id){
        return productService.getProduct(id);
    }
    //----------------------------
    @PostMapping("/update/{id}")
    public ProductResponse updateproduct(@PathVariable("id") Long id, @RequestBody ProductReq productReq) {
        return productService.updateProduct(id, productReq);
    }
    //----------------------------
    @DeleteMapping("/delete/{id}")
    public void deleteproduct(@PathVariable("id") Long id) {
        productService.deleteProduct(id);
    }
    //----------------------------
    @GetMapping("/products")
    public List<ProductResponse> getallproducts(){
        return productService.getAllProducts();
    }
}
