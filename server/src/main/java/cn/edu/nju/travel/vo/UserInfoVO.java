package cn.edu.nju.travel.vo;

import cn.edu.nju.travel.constant.RoleTypeCode;
import cn.edu.nju.travel.entity.AdminEntity;
import cn.edu.nju.travel.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties.Admin;

/**
 * Created by Jiayiwu on 19/1/13.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoVO {

    private int id;

    private String name;

    private String mobile;

    private String mail;

    private String logoUrl;

    private int type;

    private int fansNum;

    private boolean isConcerned;

    public UserInfoVO(UserEntity userEntity){
        this.id = userEntity.getId();
        this.name = userEntity.getName();
        this.mobile = userEntity.getMobile();
        this.mail = userEntity.getMail();
        this.logoUrl = userEntity.getLogoUrl();
        this.type = RoleTypeCode.USER.getIndex();
        this.fansNum = userEntity.getFansNum();
    }

    public UserInfoVO(AdminEntity adminEntity){
        this.id = adminEntity.getId();
        this.name = adminEntity.getName();
        this.type = RoleTypeCode.ADMIN.getIndex();
    }
}
