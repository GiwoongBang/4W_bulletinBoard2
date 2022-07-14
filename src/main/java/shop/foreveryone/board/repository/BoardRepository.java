package shop.foreveryone.board.repository;

import shop.foreveryone.board.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;


public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findAllByModifiedAtBetweenOrderByModifiedAtDesc(LocalDateTime start, LocalDateTime end);
}