package com.foodapp.food_delivery.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.foodapp.food_delivery.model.enum_model.Status;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "Orders")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    Integer orderId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @JoinColumn(name = "restaurant_id")
    Restaurant restaurant;

    @Column(name = "order_time")
    LocalDateTime orderDate;
    @Column(name = "total_price",precision = 10, scale = 2)
    BigDecimal totalPrice;
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    Status status;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    List<OrderItem> orderItems;
}