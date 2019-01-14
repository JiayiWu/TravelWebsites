package cn.edu.nju.travel.constant;

/**
 * Created by Jiayiwu on 19/1/12.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
public enum RoleTypeCode {


    USER(0,"普通用户"),ADMIN(1,"管理员");
    private final String value;
    private final int index;

    RoleTypeCode(int index, String value){
        this.index = index;
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public int getIndex() {
        return index;
    }

    public static RoleTypeCode getTypeByIndex(int index){
        switch (index){
            case 0:
                return USER;
            case 1:
                return ADMIN;
        }

        return null;
    }
}
