package com.foodapp.food_delivery.security;

import com.foodapp.food_delivery.dto.request.LoginRequest;
import com.foodapp.food_delivery.dto.request.RegisterRequest;
import com.foodapp.food_delivery.dto.response.LoginResponse;
import com.foodapp.food_delivery.dto.response.RegisterResponse;
import com.foodapp.food_delivery.exception.AppException;
import com.foodapp.food_delivery.model.User;
import com.foodapp.food_delivery.model.enum_model.Role;
import com.foodapp.food_delivery.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthService {

    AuthenticationManager authenticationManager;
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    JwtService jwtService;

    public LoginResponse login(LoginRequest request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtService.generateToken(user);
        System.out.println("Generated token: " + token);

        return LoginResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .token(token) // thêm token vào response
                .build();
    }

    public RegisterResponse register(RegisterRequest request) {
        System.out.println(request.getEmail());
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException("Email already exists");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.customer)
                .build();

        User savedUser = userRepository.save(user);

        return RegisterResponse.builder()
                .id(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole().name())
                .build();
    }
}
