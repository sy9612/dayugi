package com.ssafy.dayugi.model.entity;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Diary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int did;
    @NotNull
    private String diary_content;
    @Lob
    private String review_content;
    @NotNull
    private Date diary_date;
    @ManyToOne
    @JoinColumn(name="uid")
    private User user;

//    private User user;
}
