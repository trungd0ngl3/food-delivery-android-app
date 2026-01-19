package com.foodapp.food_delivery.model;

import java.math.BigDecimal;
import java.util.List;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "Menu")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_id")
    Integer menuId;

    @Column(name = "item_name")
    String name;
    @Column(precision = 10, scale = 2)
    BigDecimal price;
    String description;
    @Column(name = "image_url")
    String image;
    
    String category; // Grouping like "Burger", "Drink"
    
    @Column(name = "available_for_pickup")
    Boolean availableForPickup;
    
    @Column(name = "available_for_delivery")
    Boolean availableForDelivery;
    
    @Column(precision = 3, scale = 1)
    BigDecimal rating;
    
    @Column(name = "review_count")
    Integer reviewCount;


    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    Restaurant restaurant;

    @OneToMany(mappedBy = "menu", cascade = CascadeType.ALL)
    List<CartItem> cartItems;

    @OneToMany(mappedBy = "menu", cascade = CascadeType.ALL)
    List<OrderItem> orderItems;
}
