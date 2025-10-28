package com.foodapp.food_delivery.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.foodapp.food_delivery.dto.request.UserCreationRequest;
import com.foodapp.food_delivery.dto.response.UserResponse;
import com.foodapp.food_delivery.mapper.UserMapper;
import com.foodapp.food_delivery.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;

    UserMapper userMapper;

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    public UserResponse createUser(UserCreationRequest request) {
        var user = userMapper.toUser(request);
        return userMapper.toUserResponse(userRepository.save(user));
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    public UserResponse updateUser(String id, UserCreationRequest request) {
        var user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        userMapper.updateUser(request, user);
        return userMapper.toUserResponse(userRepository.save(user));
    }
}
