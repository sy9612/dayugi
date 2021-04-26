package com.ssafy.dayugi.service;

import com.ssafy.dayugi.model.entity.Diary;
import com.ssafy.dayugi.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DiaryServiceImpl implements DiaryService{

    @Autowired
    private DiaryRepository diaryRepository;

    @Override
    public boolean writeDiary(Diary diary) throws Exception {
        return false;
    }

    @Override
    public boolean updateDiary(Diary diary) throws Exception {
        return false;
    }

    @Override
    public List<Diary> readDiary(int did) throws Exception {
        return null;
    }

    @Override
    public List<Diary> monthDiary(int year, int month) throws Exception {
        return null;
    }

    @Override
    public boolean deleteDiary(int did) throws Exception {
        Optional<Diary> diary = diaryRepository
        return false;
    }
}
