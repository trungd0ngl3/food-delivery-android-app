package com.foodapp.food_delivery.model;

import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;


@Entity
@Table(name = "Restaurants")
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "restaurant_id")
    Integer restaurantId;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    User owner;

    String name;
    String address;
    String phone;
    @Column(name = "opening_time")
    LocalTime openingTime;
    @Column(name = "closing_time")
    LocalTime closingTime;
    
    @Builder.Default
    BigDecimal rating = BigDecimal.ZERO;

    String image;
    String description;
    @Column(name = "delivery_fee")
    BigDecimal deliveryFee;
    @Column(name = "delivery_time")
    String deliveryTime;

    
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    List<Menu> menuItems;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    List<Order> orders;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    List<Review> reviews;

    @ManyToMany
    @JoinTable(
        name = "restaurant_categories",
        joinColumns = @JoinColumn(name = "restaurant_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    Set<Category> categories;


}
