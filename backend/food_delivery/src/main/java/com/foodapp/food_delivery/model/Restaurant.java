package com.foodapp.food_delivery.model;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;


@Entity
@Table(name = "restaurants")
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long restaurantId;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    User owner;

    String name;
    String address;
    String phone;
    LocalTime openingTime;
    LocalTime closingTime;
    
    @Builder.Default
    BigDecimal rating = BigDecimal.ZERO;
    
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    List<Menu> menuItems;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    List<Order> orders;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    List<Review> reviews;

}
