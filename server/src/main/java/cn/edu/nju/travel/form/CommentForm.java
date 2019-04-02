package cn.edu.nju.travel.form;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created on 2019/3/27
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentForm {

    @ApiModelProperty(notes = "被评论的主体id")
    private int referId;

    @ApiModelProperty(notes = "被评论的主体类型， 1为活动， 2为朋友圈")
    private int type;

    @ApiModelProperty(notes = "评论内容")
    private String content;

    @ApiModelProperty(notes = "回复主体，若为首条评论则传入0或者不传默认为null")
    private Integer parentId;

}
