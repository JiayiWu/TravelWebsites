package cn.edu.nju.travel.vo;

import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import lombok.Data;

/**
 * Created on 2019/4/5
 */
@Data
public class BlogVO {

    @ApiModelProperty("朋友圈id")
    private int id;

    @ApiModelProperty("发布者id")
    private int userId;

    @ApiModelProperty("发布者头像")
    private String userAvatar;

    @ApiModelProperty("发布者姓名")
    private String userName;

    @ApiModelProperty("内容")
    private String content;

    @ApiModelProperty("照片url列表")
    private List<String> photos;

    @ApiModelProperty("发布时间")
    private long createTime;

    @ApiModelProperty("点赞数")
    private int likeCount;

    @ApiModelProperty("是否是自己发布的")
    private boolean isMyself;
}
