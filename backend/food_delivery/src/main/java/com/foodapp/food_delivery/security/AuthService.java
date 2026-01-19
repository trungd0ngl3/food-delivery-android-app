package com.foodapp.food_delivery.security;

import com.foodapp.food_delivery.dto.request.*;
import com.foodapp.food_delivery.dto.response.LoginResponse;
import com.foodapp.food_delivery.dto.response.RegisterResponse;
import com.foodapp.food_delivery.exception.AppException;
import com.foodapp.food_delivery.model.User;
import com.foodapp.food_delivery.model.enum_model.Role;
import com.foodapp.food_delivery.repository.UserRepository;
import com.foodapp.food_delivery.service.OtpService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthService {

    OtpService otpService;
    JavaMailSenderImpl mailSender;
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

    public String requestRegisterOtp(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new AppException("Email already exists");
        }

        String otp = otpService.generateRegisterOtp(req.getEmail());
        sendOTPEmail(req.getEmail(), otp);
        return "OK";
    }

    public RegisterResponse confirmRegister(ConfirmRegisterRequest req) {
        if (!otpService.verifyRegisterOtp(req.getEmail(), req.getOtp())) {
            throw new AppException("OTP invalid or expired");
        }

        if (userRepository.existsByEmail(req.getEmail())) {
            throw new AppException("Email already exists");
        }

        User user = User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
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

    public String requestForgotPasswordOtp(ForgotPasswordRequestOtp req) {
        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new AppException("User not found"));

        String otp = otpService.generateForgotOtp(user.getEmail());
        sendOTPEmail(user.getEmail(), otp);
        return "Fogo Pass";
    }

    public String confirmForgotPassword(ForgotPasswordConfirmRequest req) {
        if (!otpService.verifyForgotOtp(req.getEmail(), req.getOtp())) {
            throw new AppException("OTP invalid or expired");
        }

        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new AppException("User not found"));

        user.setPassword(passwordEncoder.encode(req.getNewPassword()));
        userRepository.save(user);
        return "Fogo Pass Solved";
    }

    private void sendOTPEmail(String email, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your OTP for Account Verification");
        message.setText("Your OTP is: " + otp + "\nThis OTP is valid for 5 minutes.");
        mailSender.send(message);
    }
}
