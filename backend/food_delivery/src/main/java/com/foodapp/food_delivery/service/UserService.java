package com.foodapp.food_delivery.service;

import java.util.List;

import com.foodapp.food_delivery.dto.request.UserUpdateRequest;
import com.foodapp.food_delivery.dto.response.UserUpdateResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.foodapp.food_delivery.dto.request.UserCreationRequest;
import com.foodapp.food_delivery.dto.response.UserCreationResponse;
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
    PasswordEncoder passwordEncoder;

    // Lấy danh sách user
    public List<UserCreationResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    // Tạo user
    public UserCreationResponse createUser(UserCreationRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        var user = userMapper.toUser(request);

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return userMapper.toUserResponse(userRepository.save(user));
    }


    // Xóa user
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    // Cập nhật user
    public UserUpdateResponse updateUser(Integer id, UserUpdateRequest request) {
        var user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        userMapper.updateUser(request, user);
        return userMapper.toUserUpdateResponse(userRepository.save(user));
    }
}
