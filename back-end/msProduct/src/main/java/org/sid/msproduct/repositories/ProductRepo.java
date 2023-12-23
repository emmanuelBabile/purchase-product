package org.sid.msproduct.repositories;

import org.sid.msproduct.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<Product,Long> {
}
