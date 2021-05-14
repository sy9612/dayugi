package com.ssafy.dayugi.model.entity;

import com.sun.istack.NotNull;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "emotion_rate")
public class EmotionRate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="erid")
    private int erid;

    @OneToOne
    @JoinColumn(name="did", referencedColumnName = "did", nullable = true)
    private Diary did;

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
