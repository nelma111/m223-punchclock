package ch.zli.m223.punchclock.controller;

import ch.zli.m223.punchclock.domain.Category;
import ch.zli.m223.punchclock.service.CategoryService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Category> getAll() {
        return categoryService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Category create(@Valid @RequestBody Category category) {
        return categoryService.create(category);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) throws ResponseStatusException {
        try {
            categoryService.delete(id);
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, ex.getLocalizedMessage());
        }
    }
    @PutMapping()
    public Category update(@Valid @RequestBody Category category) {
        return  categoryService.update(category);
    }
}