package com.ssafy.dayugi.service;

import com.ssafy.dayugi.model.entity.User;
import com.ssafy.dayugi.repository.UserRepository;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<User> login(Map map) throws Exception {
        String InputEmail = map.get("email").toString();
        String InputPassword = map.get("password").toString();

        Optional<User> standard = userRepository.findUserByEmail(InputEmail);
        if(standard.isPresent()){
            if(standard.get().getPassword().equals(InputPassword)){
                return standard;
            }
        }
        return Optional.empty();
    }

    @Override
    public int join(User user) throws Exception {
        String email = user.getEmail();
        Optional<User> emailCheck = userRepository.findUserByEmail(email);
        if(emailCheck.isPresent()){
            return 0;
        }
        else {
            userRepository.save(user);
            return 1;
        }
    }

    @Override
    public boolean checkEmail(String email) throws Exception {
        Optional<User> user = userRepository.findUserByEmail(email);
        return user.isPresent();
    }

    @Override
    public Optional<User> userInfo(String email) throws Exception {
        Optional<User> user = userRepository.findUserByEmail(email);
        return user;
    }

    @Override
    @Transactional
    public boolean deleteUser(String email) throws Exception {
        Optional<User> user = userRepository.findUserByEmail(email);
        if(user.isPresent()){
            userRepository.deleteUserByEmail(email);
            return true;
        }
        return false;
    }
}
