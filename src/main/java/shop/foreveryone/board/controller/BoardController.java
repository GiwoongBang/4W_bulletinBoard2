package shop.foreveryone.board.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import shop.foreveryone.board.dto.BoardRequestDto;
import shop.foreveryone.board.model.Board;
import shop.foreveryone.board.repository.BoardRepository;
import shop.foreveryone.board.service.BoardService;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class BoardController {

    private final BoardRepository boardRepository;
    private final BoardService boardService;

    // 전체 게시글 조회
    @GetMapping("/api/boards")
    public List<Board> getBoards() {
        LocalDateTime start = LocalDateTime.now().minusDays(1);
        LocalDateTime end = LocalDateTime.now();
        return boardRepository.findAllByModifiedAtBetweenOrderByModifiedAtDesc(start, end);
    }

    // 신규 게시글 등록
    @PostMapping("/api/boards")
    public Board createBoard(@RequestBody BoardRequestDto requestDto) {
        Board board = new Board(requestDto);
        return boardRepository.save(board);
    }

    // 게시글 수정
    @PutMapping("/api/boards/{id}")
    public boolean updateBoard(@PathVariable Long id, @RequestBody BoardRequestDto requestDto) {
        return boardService.update(id, requestDto);
    }

    @DeleteMapping("api/boards/{id}")
    public boolean deleteBoard(@PathVariable Long id, @RequestBody BoardRequestDto requestDto) {
        return boardService.delete(id, requestDto);
    }

}