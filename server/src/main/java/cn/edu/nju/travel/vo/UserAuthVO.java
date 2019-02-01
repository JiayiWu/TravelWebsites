package cn.edu.nju.travel.vo;

import cn.edu.nju.travel.constant.ApproveStateCode;
import cn.edu.nju.travel.entity.AuthenticationEntity;
import java.sql.Timestamp;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Created on 2019/1/16
 */
@Getter
@NoArgsConstructor
public class UserAuthVO {

    @Setter
    private int id;
    @Setter
    private int userId;
    @Setter
    private String attachmentUrl;
    @Setter
    private String context;
    @Setter
    private Timestamp applyTime;
    private int state;


    public UserAuthVO(AuthenticationEntity entity){
        this.id = entity.getId();
        this.userId = entity.getUserId();
        this.attachmentUrl = entity.getAttachmentUrl();
        this.context = entity.getContext();
        this.state = entity.getState();
        this.applyTime = entity.getModifyTime();
    }

    public void setState(ApproveStateCode code){
        this.state = code.getIndex();
    }
}
