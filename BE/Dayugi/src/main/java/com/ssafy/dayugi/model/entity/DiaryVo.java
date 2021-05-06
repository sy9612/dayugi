package com.ssafy.dayugi.model.entity;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class DiaryVo {
    private Diary diary;
    private MultipartFile multipartFile;
}
