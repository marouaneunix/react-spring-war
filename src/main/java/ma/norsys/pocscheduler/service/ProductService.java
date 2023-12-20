package ma.norsys.pocscheduler.service;


import lombok.RequiredArgsConstructor;
import ma.norsys.pocscheduler.controller.dto.ProductDto;
import ma.norsys.pocscheduler.domain.Product;
import ma.norsys.pocscheduler.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ProductService {

        private final ProductRepository productRepository;

        public Map<String, ArrayList<ProductDto>> findAll() {
            Map<String, ArrayList<ProductDto>> productMapOne;
            productMapOne = new HashMap<>();
            productMapOne.put("actives", new ArrayList<>());
            productMapOne.put("archives", new ArrayList<>());
            productRepository.findAll().forEach(product -> {
                ProductDto productDto = new ProductDto(product.getId(), product.getName(), product.getPrice(), product.getArchivedAt());
                if(product.getArchivedAt() == null) {
                    ArrayList<ProductDto> actives = productMapOne.get("actives");
                    actives.add(productDto);
                    productMapOne.put("actives", actives);
                } else {
                    ArrayList<ProductDto> archives = productMapOne.get("archives");
                    archives.add(productDto);
                    productMapOne.put("archives", archives);
                }
            });
            return productMapOne;
        }

    public ProductDto saveProduct(ProductDto productDto) {
        Product product = new Product();
        product.setPrice(productDto.getPrice());
        product.setName(productDto.getName());
        productRepository.save(product);
        productDto.setId(product.getId());
        return productDto;
    }

    public Long activateProduct(Long id) {
        Optional<Product> product = productRepository.findById(id);
        Product activatedProduct = product.get();
        activatedProduct.setArchivedAt(null);
        productRepository.save(activatedProduct);
        return id;
    }

    public Long archiveProduct(Long id) {
        Optional<Product> product = productRepository.findById(id);
        Product activatedProduct = product.get();
        activatedProduct.setArchivedAt(new Date());
        productRepository.save(activatedProduct);
        return id;
    }
}
