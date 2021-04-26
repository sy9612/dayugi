package com.ssafy.dayugi.model.entity;

import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class Diary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String diary_content;
    @Lob
    private String review_content;
    @NotNull
    private Date diary_date;
}
