package shop.foreveryone.board.dto;

import lombok.Getter;

@Getter
public class BoardRequestDto {
    // 작성자
    private String username;
    // 제목
    private String title;
    // 내용
    private String content;
    // 비밀번호
    private String password;
}