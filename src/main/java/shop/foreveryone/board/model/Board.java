package shop.foreveryone.board.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import shop.foreveryone.board.dto.BoardRequestDto;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class Board extends Timestamped {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String password;

    public Board(BoardRequestDto requestDto) {
        this.username = requestDto.getUsername();
        this.title = requestDto.getTitle();
        this.content = requestDto.getContent();
        this.password = requestDto.getPassword();
    }

    public void update(BoardRequestDto requestDto) {
        this.content = requestDto.getContent();
        this.password = requestDto.getPassword();
    }
}