package com.foodapp.food_delivery.model;

import java.time.LocalDateTime;
import com.foodapp.food_delivery.model.enum_model.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "Users") // PHẢI ĐÚNG HOA–THƯỜNG
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    Integer id;

    @Column(name = "name")
    String name;

    @Column(name = "email")
    String email;

    @Column(name = "password_hash")
    String password;

    @Column(name = "phone")
    String phone;

    @Column(name = "address")
    String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    Role role;

    @Column(name = "created_at", updatable = false, insertable = false)
    LocalDateTime createdDate;
}

