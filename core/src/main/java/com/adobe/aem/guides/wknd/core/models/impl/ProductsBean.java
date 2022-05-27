package com.adobe.aem.guides.wknd.core.models.impl;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.concurrent.atomic.AtomicLong;

@Model(adaptables = Resource.class)
public class ProductsBean {
    @Inject
    private  String productName;
    @Inject
    private  String productDescription;
    @Inject
    private String productPrice;
    @Inject
    private  String fileReference;

    private String productId;

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public String getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(String productPrice) {
        this.productPrice = productPrice;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getFileReference() {
        return fileReference;
    }

    public void setFileReference(String fileReference) {
        this.fileReference = fileReference;
    }

    @PostConstruct
    protected void init() {
        AtomicLong atomicLong = new AtomicLong(1);
            atomicLong.incrementAndGet();
        setProductId("Product-"+atomicLong);
    }
}
