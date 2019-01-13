package cn.edu.nju.travel.controller;

import cn.edu.nju.travel.form.SimpleResponse;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;

/**
 * Created by Jiayiwu on 19/1/13.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
@RestController
@RequestMapping("/file/")
public class FileController {

    @ApiOperation(value = "上传文件", response = SimpleResponse.class,notes = "返回上传文件后文件指定的路径")
    @RequestMapping(value="/upload", method = RequestMethod.POST)
    public SimpleResponse handleFileUpload(HttpSession session, @RequestParam("file") MultipartFile file) {
        return null;
    }
    }
