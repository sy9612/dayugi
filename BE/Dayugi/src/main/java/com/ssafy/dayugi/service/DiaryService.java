package com.ssafy.dayugi.service;

import com.ssafy.dayugi.model.entity.Diary;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface DiaryService {
    public int writeDiary(Diary diary)throws Exception;//다이어리 작성
    public boolean updateDiary(Diary diary) throws Exception;//다이어리 수정
    public Optional<Diary> readDiary(int did) throws Exception;//다이어리 상세 조회
    public List<Optional<Diary>> monthDiary(int uid, int year, int month) throws Exception;//다이어리 연도, 월별 조회
    public boolean deleteDiary(int did) throws Exception;//다이어리 한 개 삭제
    public boolean deleteAllDiary(int uid) throws Exception;//작성한 다이어리 전체 삭제
    public int findDiaryId(int uid, Date diary_date) throws Exception;//did 찾기
}
