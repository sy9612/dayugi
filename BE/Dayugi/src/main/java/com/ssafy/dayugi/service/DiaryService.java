package com.ssafy.dayugi.service;

import com.ssafy.dayugi.model.entity.Diary;

import java.util.List;
import java.util.Optional;

public interface DiaryService {
    public boolean writeDiary(Diary diary)throws Exception;//다이어리 작성
    public boolean updateDiary(Diary diary) throws Exception;//다이어리 수정
    public List<Diary> readDiary(int did) throws Exception;//다이어리 상세,전체 조회
    public List<Diary> monthDiary(int year, int month) throws Exception;//다이어리 월별 조회
    public boolean deleteDiary(int did) throws Exception;//다이어리 삭제
}
