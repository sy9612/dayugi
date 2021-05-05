package com.ssafy.dayugi.service;

import com.ssafy.dayugi.model.entity.Diary;
import com.ssafy.dayugi.model.entity.DiaryFile;
import com.ssafy.dayugi.repository.DiaryFileRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class FileServiceImpl implements FileService{
    @Autowired
    private DiaryFileRepository diaryFileRepository;

    @Override
    public Long saveFiles(List<DiaryFile> files) {
        return diaryFileRepository.save(files);
    }

    @Override
    public Long saveFile(DiaryFile file) {
        return diaryFileRepository.save(file);
    }

    @Override
    public DiaryFile getFile(int fid) {
        Optional<Diary> diaryfile = diaryFileRepository.find(fid);
        return diaryfile;
    }
}
