package com.chs.meetvent.domain;

import com.chs.meetvent.domain.views.Views;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.Embeddable;

@Embeddable
public class Address {
    @JsonView(Views.Public.class)
    private String city;
    @JsonView(Views.Public.class)
    private String street;

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }
}
