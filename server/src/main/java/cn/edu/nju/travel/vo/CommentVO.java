package cn.edu.nju.travel.vo;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created on 2019/3/27
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentVO {

    @ApiModelProperty("评论id")
    private int id;

    @ApiModelProperty("评论者用户名")
    private String commenter;

    @ApiModelProperty("评论者头像")
    private String commenterLogo;

    @ApiModelProperty("被回复者用户名,若无则返回null")
    private String commentedUser;

    @ApiModelProperty("被回复的评论id，若无则返回null")
    private Integer parentId;

    @ApiModelProperty("评论内容")
    private String content;

    @ApiModelProperty("评论时间")
    private long createTime;

    @ApiModelProperty("是否是自己的评论")
    private boolean isMyself;

}
