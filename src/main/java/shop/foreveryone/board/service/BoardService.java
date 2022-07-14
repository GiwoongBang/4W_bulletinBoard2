package shop.foreveryone.board.service;

import shop.foreveryone.board.dto.BoardRequestDto;
import shop.foreveryone.board.model.Board;
import shop.foreveryone.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class BoardService {
    private final BoardRepository boardRepository;

    @Transactional
    public boolean update(Long id, BoardRequestDto requestDto) {
        Board board = boardRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("아이디가 존재하지 않습니다.")
        );
        if(board.getPassword().equals(requestDto.getPassword())){
            board.update(requestDto);
            return true;
        }
        return false;
    }

    @Transactional
    public boolean delete(Long id, BoardRequestDto requestDto) {
        Board board = boardRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("아이디가 존재하지 않습니다.")
        );
        if(board.getPassword().equals(requestDto.getPassword())){
            boardRepository.deleteById(id);
            return true;
        }
        return false;
    }
}