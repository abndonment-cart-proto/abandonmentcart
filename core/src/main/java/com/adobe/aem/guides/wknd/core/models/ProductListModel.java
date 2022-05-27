/*
 *  Copyright 2015 Adobe Systems Incorporated
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.adobe.aem.guides.wknd.core.models;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.aem.guides.wknd.core.models.impl.ProductsBean;


@Model(adaptables = Resource.class)
public class ProductListModel {

    private static final Logger log = LoggerFactory.getLogger(ProductListModel.class);

    @SlingObject
    private ResourceResolver resourceResolver;


    private String productsPath = "/var/commerce/products/we-retail/me/shirts";

    @Inject
    @Optional
    private List<Resource> products;

    private List<ProductsBean> productsList = new ArrayList<>();

    public List<ProductsBean> getProductsList() {

        return productsList;
    }

    public void setProductsList(List<ProductsBean> productsList) {

        this.productsList = productsList;
    }




    @PostConstruct
    protected void init() {
        log.debug("inside init");

        log.debug(" products"+products);
        AtomicLong atomicLong = new AtomicLong(1);
            for (Resource resource : products) {
                log.debug(" resource"+resource);

                ProductsBean p1 = resource.adaptTo(ProductsBean.class);
                String uniqueID = UUID.randomUUID().toString();
                log.debug(" uniqueID ",uniqueID);

                log.debug(" productId ",p1.getProductId());
                log.debug(" productPrice "+p1.getProductPrice());
                productsList.add(p1);
            }

        log.debug(" productsList "+productsList);
    }


}