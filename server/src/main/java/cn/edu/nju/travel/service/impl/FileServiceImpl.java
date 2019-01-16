package cn.edu.nju.travel.service.impl;

import cn.edu.nju.travel.form.ResponseCode;
import cn.edu.nju.travel.form.SimpleResponse;
import cn.edu.nju.travel.service.FileService;
import cn.edu.nju.travel.utils.FileOptions;
import cn.edu.nju.travel.utils.ServerException;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created on 2019/1/16
 */
@Service
public class FileServiceImpl implements FileService{

    @Value("${file.maxUploadSizeMB}")
    private int maxUploadSize;



    @Override
    public String handleFileUpload(MultipartFile file, String directory)
            throws Exception {

        if(file.isEmpty()){
            throw new ServerException(ResponseCode.Error,"文件不能为空");
        }
        if(file.getSize() > maxUploadSize*1024*1024){
            throw new ServerException(ResponseCode.Error,"文件大小不能超过"+maxUploadSize+"M");
        }

        int index = file.getOriginalFilename().lastIndexOf(".");
        String suffix = file.getOriginalFilename().substring(index);
        String contextPath = FileOptions.getContextPath();
        String randomName = FileOptions.getRandomName();
        String saveFileName = Paths.get(contextPath,directory,randomName+suffix)
                .toString();
        File saveFile = new File(saveFileName);
        while(saveFile.exists()){
            randomName = FileOptions.getRandomName();
            saveFileName = Paths.get(contextPath,directory,randomName+suffix)
                    .toString();
            saveFile = new File(saveFileName);
        }
        File parentFile = saveFile.getParentFile();
        if(!parentFile.exists()){
            parentFile.mkdirs();
        }
        file.transferTo(saveFile);
        return directory+"/"+randomName+suffix;

    }

    @Override
    public boolean deleteOldFile(String oldPath) throws Exception {
        if (oldPath == null) {
            return true;
        }
        String relativePath = oldPath;
        if (oldPath.startsWith("http")) {
            String[] urlArr = oldPath.split("/");
            StringBuilder stringBuilder = new StringBuilder();
            for (int i = 2; i < urlArr.length; i++) {
                stringBuilder.append(urlArr[i]);
                if (i != urlArr.length - 1) {
                    stringBuilder.append("/");
                }
            }
            relativePath = stringBuilder.toString();
        }
        String contextPath = FileOptions.getContextPath();
        File oldFile = Paths.get(contextPath, relativePath).toFile();
        return !oldFile.exists() || oldFile.delete();

    }

}
