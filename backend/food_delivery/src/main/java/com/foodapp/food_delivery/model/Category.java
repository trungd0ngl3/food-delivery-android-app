package com.foodapp.food_delivery.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Table(name = "Categories")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    Integer categoryId;

    @Column(nullable = false, unique = true)
    String name;

    String image;

//    @ManyToMany(mappedBy = "categories")
//    List<Restaurant> restaurants;
}
