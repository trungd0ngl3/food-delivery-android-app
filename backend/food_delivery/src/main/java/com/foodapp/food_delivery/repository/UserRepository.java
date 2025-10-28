package com.foodapp.food_delivery.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodapp.food_delivery.model.User;
@Repository
public interface UserRepository extends JpaRepository<User, String> {

}
