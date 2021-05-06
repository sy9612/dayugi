package com.ssafy.dayugi.service;

import com.ssafy.dayugi.model.entity.DiaryFile;
import com.ssafy.dayugi.repository.DiaryFileRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class FileServiceImpl implements FileService {
    @Autowired
    private DiaryFileRepository fileRepository;

    @Override
    public int saveFiles(List<DiaryFile> files) {
        fileRepository.saveAll(files);
        return 1;
    }

    @Override
    public int saveFile(DiaryFile file) {
        fileRepository.save(file);
        return 1;
    }


    @Override
    public DiaryFile getFile(Long fid) {
        DiaryFile file = fileRepository.findById(fid).get();
        return file;
    }
}
