package com.ssafy.dayugi.service;

import com.ssafy.dayugi.model.entity.User;
import com.ssafy.dayugi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    UserRepository userRepository;
    PasswordEncoder passwordSecurity;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordSecurity) {
        this.userRepository = userRepository;
        this.passwordSecurity = passwordSecurity;
    }

    @Override
    public Optional<User> login(Map map) throws Exception {
        String InputEmail = map.get("email").toString();
        String InputPassword = map.get("password").toString();

        Optional<User> standard = userRepository.findUserByEmail(InputEmail);
        if(standard.isPresent()){
            if(passwordSecurity.matches(InputPassword, standard.get().getPassword())){
                standard.get().setPassword("");
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
            user.setPassword(passwordSecurity.encode(user.getPassword()));
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
        user.ifPresent(value -> value.setPassword(""));
        return user;
    }

    @Override
    @Transactional
    public boolean deleteUser(String email) throws Exception {
        Optional<User> user = userRepository.findUserByEmail(email);
        if(user.isPresent()){
            int check = userRepository.deleteUserByEmail(email);
            // 삭제된 row가 존재하지 않는 경우
            if(check == 0) return false;
            return true;
        }
        // 입력받은 email에 매칭되는 정보가 없는 경우
        return false;
    }

    @Override
    public boolean changeUserInfo(User user) throws Exception{
        Optional<User> checkPresent = userRepository.findUserByEmail(user.getEmail());
        if(checkPresent.isPresent()){
            checkPresent.get().setPassword(passwordSecurity.encode(user.getPassword()));
            checkPresent.get().setNickname(user.getNickname());
            userRepository.save(checkPresent.get());
            return true;
        }
        return false;
    }

}
