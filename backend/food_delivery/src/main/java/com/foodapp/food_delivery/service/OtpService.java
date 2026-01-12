package com.foodapp.food_delivery.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class OtpService {

    private static final String PREFIX_REGISTER = "OTP:REGISTER:";
    private static final String PREFIX_FORGOT   = "OTP:FORGOT:";
    private static final long OTP_TTL_SECONDS   = 300L; // 5 phút

    private final StringRedisTemplate redisTemplate;

    public String generateRegisterOtp(String email) {
        return generateOtp(PREFIX_REGISTER + email);
    }

    public boolean verifyRegisterOtp(String email, String inputOtp) {
        return verifyOtp(PREFIX_REGISTER + email, inputOtp);
    }

    public String generateForgotOtp(String email) {
        return generateOtp(PREFIX_FORGOT + email);
    }

    public boolean verifyForgotOtp(String email, String inputOtp) {
        return verifyOtp(PREFIX_FORGOT + email, inputOtp);
    }

    private String generateOtp(String key) {
        String otp = String.format("%06d", ThreadLocalRandom.current().nextInt(0, 1_000_000));
        redisTemplate.opsForValue().set(key, otp, OTP_TTL_SECONDS, TimeUnit.SECONDS);
        return otp;
    }

    private boolean verifyOtp(String key, String inputOtp) {
        String cached = redisTemplate.opsForValue().get(key);
        if (cached != null && cached.equals(inputOtp)) {
            redisTemplate.delete(key);
            System.out.println("Dang chay ne");
            return true;
        }
        System.out.println("Bi gi roi");
        return false;
    }
}
