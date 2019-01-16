package cn.edu.nju.travel.service.impl;

import cn.edu.nju.travel.form.ResponseCode;
import cn.edu.nju.travel.form.SimpleResponse;
import cn.edu.nju.travel.service.FileService;
import cn.edu.nju.travel.utils.ServerException;
import java.io.File;
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
    public String handleFileUpload(MultipartFile file, String directory) {

        if(file.isEmpty()){
            throw new ServerException(ResponseCode.Error,"文件不能为空");
        }
        if(file.getSize() > maxUploadSize*1024*1024){
            throw new ServerException(ResponseCode.Error,"文件大小不能超过"+maxUploadSize+"M");
        }

        int index = file.getOriginalFilename().lastIndexOf(".");
        String suffix = file.getOriginalFilename().substring(index);
        try {
            File path = new File(ResourceUtils.getURL("classpath:").getPath());
            if(!path.exists()){
                path = new File("");
            }
            String contextPath = Paths.get(path.getAbsolutePath(),"static").toString();
            String randomName = getRandomFileName();
            String saveFileName = Paths.get(contextPath,directory,randomName+suffix)
                    .toString();
            File saveFile = new File(saveFileName);
            while(saveFile.exists()){
                randomName = getRandomFileName();
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
        } catch (IOException e) {
            throw new ServerException(ResponseCode.Error,e.getMessage());
        }
    }

    private String getRandomFileName(){
        SimpleDateFormat simpleDateFormat;
        simpleDateFormat = new SimpleDateFormat("yyyyMMdd");
        Date date = new Date();
        String str = simpleDateFormat.format(date);
        Random random = new Random();
        int ranNum = (int) (random.nextDouble() * (99999 - 10000 + 1)) + 10000;// 获取5位随机数
        return ranNum + str;
    }
}
