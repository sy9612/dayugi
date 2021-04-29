package com.ssafy.dayugi.controller;

import com.ssafy.dayugi.model.entity.User;
import com.ssafy.dayugi.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(value = "")
    @ApiOperation(value = "로그인", notes = "email, password를 받아 정보 확인 후 유저정보 반환")
    private ResponseEntity login(@RequestBody Map map){
        Map result = new HashMap();
        ResponseEntity entity = null;
        try {
            Optional<User> user = userService.login(map);
            if (user.isPresent()) {
                result.put("success", "success");
                result.put("data", user);

            } else {
                result.put("success", "fail");
                result.put("message", "ID 또는 비밀번호를 확인하세요.");
            }
            //            UsernamePasswordAuthenticationToken authenticationToken =
//                    new UsernamePasswordAuthenticationToken(user.get().getEmail(), user.get().getPassword());
//
//            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//
//            String jwt = tokenProvider.createToken(authentication);
//            httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);


            entity = new ResponseEntity<>(result, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            result.put("success", "error");
            entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        entity = new ResponseEntity<>(result, HttpStatus.OK);
        return entity;
    }

    // 회원가입
    @PostMapping(value = "/join")
    @ApiOperation(value = "회원가입", notes = "유저dto를 받아 이메일 중복확인 후 db에 저장")
    private ResponseEntity join(@RequestBody User user){
        Map result = new HashMap();
        ResponseEntity entity = null;
        try {
            if(userService.join(user) == 1){
                result.put("success", "success");
                entity = new ResponseEntity<>(result, HttpStatus.CREATED);
            }
            else{
                result.put("success", "fail");
                entity = new ResponseEntity<>(result, HttpStatus.OK);
            }
        }catch (Exception e){
            e.printStackTrace();
            result.put("success", "error");
            entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    @GetMapping(value = "/check")
    @ApiOperation(value = "email중복 확인", notes = "email을 받아 이메일 중복 확인")
    private ResponseEntity checkEmail(String email){
        Map result = new HashMap();
        ResponseEntity entity = null;
        try {
            boolean checkDuplicate = userService.checkEmail(email);
            if(checkDuplicate){
                result.put("success", "success");
            }
            else{
                result.put("success", "fail");
            }
            entity = new ResponseEntity<>(result, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            result.put("success", "error");
            entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    @DeleteMapping(value = "")
    @ApiOperation(value = "회원탈퇴", notes = "이메일을 입력받아 해당되는 유저정보 삭제")
    private ResponseEntity delete(String email){
        Map result = new HashMap();
        ResponseEntity entity = null;
        try {
            boolean checkSuccess = userService.deleteUser(email);
            if (checkSuccess) {
                result.put("success", "success");
            } else {
                result.put("success", "fail");
            }
            entity = new ResponseEntity<>(result, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            result.put("success", "error");
            entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    @GetMapping(value = "")
    @ApiOperation(value = "회원정보 조회", notes = "이메일을 입력받아 해당하는 유저의 정보 반환")
    private ResponseEntity searchInfo(@RequestParam String email){
        Map result = new HashMap();
        ResponseEntity entity = null;
        try{
            Optional<User> user = userService.userInfo(email);
            if(user.isPresent()){
                result.put("success", "success");
                result.put("data", user);
            }
            else{
                result.put("success", "fail");
            }
            entity = new ResponseEntity<>(result, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            result.put("success", "error");
            entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return entity;
    }

    @PutMapping(value = "")
    @ApiOperation(value = "회원정보 수정", notes = "이미 가입한 유저정보를 입력받아 db내용 수정")
    private ResponseEntity modifyUser(@RequestBody User user){
        Map result = new HashMap();
        ResponseEntity entity = null;
        try{
            boolean checkSuccess = userService.changeUserInfo(user);
            if(checkSuccess){
                result.put("success", "success");
            }
            else{
                result.put("success", "fail");
            }
            entity = new ResponseEntity<>(result, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            result.put("success", "error");
            entity = new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        return entity;
    }


}
