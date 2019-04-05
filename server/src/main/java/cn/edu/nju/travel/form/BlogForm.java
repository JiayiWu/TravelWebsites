package cn.edu.nju.travel.form;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * Created on 2019/4/5
 */
@Data
public class BlogForm {

    @ApiModelProperty("发布人id")
    private int userId;

    @ApiModelProperty("发布的文本内容")
    private String content;

    @ApiModelProperty("发布的图片url，多图以,拼接")
    private String photos;


}
