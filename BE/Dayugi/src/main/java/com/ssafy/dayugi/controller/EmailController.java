package com.ssafy.dayugi.controller;

import com.ssafy.dayugi.service.EmailService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/email")
public class EmailController {

    private final EmailService emailService;
    private final Logger logger = LoggerFactory.getLogger(EmailController.class);

    @PostMapping("/mail")
    @ApiOperation(value = "인증 이메일 전송", notes = "성공시 인증 코드 반환")
    public ResponseEntity getAuthEmail(@ApiParam(value = "가입 신청한 유저 이메일", required = true) @RequestParam(required = true) String userEmail) {
        ResponseEntity responseEntity = null;
        Map result = new HashMap();
        try {
            String code = emailService.sendSimpleMessage(userEmail);
            result.put("success", "success");
            result.put("message", "인증 메일 전송 성공");
            result.put("result",code);

            responseEntity = ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (MessagingException | MailSendException exception) {
            logger.info(exception.getMessage());

            result.put("success", "fail");
            result.put("message", "인증메일 전송 실패");

            responseEntity = ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(result);
        }

        return responseEntity;
    }

}
