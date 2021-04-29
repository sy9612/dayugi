package com.ssafy.dayugi.model.entity;

import com.sun.istack.NotNull;
import lombok.Data;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Getter
@Data
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int uid;
    @NotNull
    private String email;
    @NotNull
    private String nickname;
    @NotNull
    private String password;
    private Date birth;
}
