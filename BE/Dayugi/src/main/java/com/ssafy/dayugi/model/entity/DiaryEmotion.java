package com.ssafy.dayugi.model.entity;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;

@Data
public class DiaryEmotion {
    @NotNull
    private int did;
    @NotNull
    private int uid;
    @NotNull
    private String happiness;
    @NotNull
    private String angry;
    @NotNull
    private String disgust;
    @NotNull
    private String fear;
    @NotNull
    private String neutral;
    @NotNull
    private String sadness;
    @NotNull
    private String surprise;
}
